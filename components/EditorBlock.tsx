import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./EditorJSTools";

type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
};

const EditorBlock = ({ data, onChange }: Props) => {
  const ref = useRef<EditorJS>();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "custom",
        tools: EDITOR_JS_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
        onReady() {
          setReady(true);
        },
      });
      ref.current = editor;
    }
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  console.log("EditorBlock");

  return (
    <div className="flex flex-col gap-2">
      <div className="prose max-w-full shadow-md bg-base-100 p-16 rounded-md">
        <div id="custom" />
      </div>
    </div>
  );
};

export default memo(EditorBlock);
