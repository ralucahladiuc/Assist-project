import addDataToDb from "./addDataToDb";

const fetchArticles = async () => {
  const response = await fetch("http://localhost:5500/blog.html");

  if (!response.ok) {
    throw new Error("fetch not ok");
  }

  // Use DOMParser to parse the HTML
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  //the information we need for the articles extracted into an array
  const blogContent = [
    ...doc.querySelector(".view-id-blog .view-content").children,
  ];

  // Extract the base URL because we need it later
  const urlString =
    blogContent[0].children[0].querySelector(".img-responsive").dataset.src;
  const url = new URL(urlString);
  const baseURL = `${url.protocol}//${url.host}`;

  // Extract information from each article element and add it to articles
  const articles = blogContent.map((element, index) => {
    const extractedInfo = {
      id: index + 1,
      thumbnail:
        element.children[0].querySelector(".img-responsive").dataset.src,
      title: element.children[0].querySelector(".title span.field-content a")
        .innerText,
      href:
        baseURL +
        element.children[0]
          .querySelector(".title span.field-content a")
          .getAttribute("href"),
      author: element.children[1].querySelector("div.field-content a")
        .innerText,
      content: element.children[2].querySelector("div.field-content p")
        .innerText,
    };

    return extractedInfo;
  });

  addDataToDb(articles);
  return articles;
};

export default fetchArticles;
