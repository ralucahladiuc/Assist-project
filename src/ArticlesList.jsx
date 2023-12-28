import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchArticles from "./fetchArticles";

const ArticleList = () => {
  const [isClicked, setIsClicked] = useState(false);

  useQuery({
    queryKey: ["details"],
    queryFn: fetchArticles,
    enabled: isClicked,
  });

  return (
    <div>
      <h1>helloo</h1>
      <button onClick={() => setIsClicked(true)}>
        Parse the HTML file and save articles in DB
      </button>
    </div>
  );
};

export default ArticleList;
