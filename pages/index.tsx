import { OutputData } from "@editorjs/editorjs";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import EditorJsRenderer from "../components/EditorJsRenderer";
// import EditorBlock from "../components/EditorBlock";
const EditorBlock = dynamic(() => import("../components/EditorBlock"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [data, setData] = useState<OutputData>();
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 p-4">
        <EditorBlock data={data} onChange={setData} />
      </div>
      <div className="col-span-1 p-4">
        {data && <EditorJsRenderer data={data} />}
      </div>
    </div>
  );
};

export default Home;
