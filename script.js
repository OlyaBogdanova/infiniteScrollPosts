const postContainer = document.getElementById("post-container");
const loader = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

//Fetch posts from API
async function getPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}
//Show posts in DOM
async function showPosts() {
  const posts = await getPost();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
  <div class='number'>${post.id}</div>
  <div class='post-info'>
  <h2 class='post-title'>${post.title}</h2>
  <p class='post-body'>${post.body}</p>
  </div>
  `;
    postContainer.appendChild(postEl);
  });
}

function showLoading() {
  loader.classList.add("show");
  setTimeout(async () => {
    page++;
    await showPosts();
    loader.classList.remove("show");
  }, 1000);
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

//filter
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    if (title.includes(term) || body.includes(term)) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

filter.addEventListener("input", filterPosts);
showPosts();
