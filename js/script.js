'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event);

  /* [Done} remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [Done] add class 'active' to the clicked link */
  event.preventDefault();
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [Done] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  console.log(targetArticle);
  /* add class 'active' to the correct article */
  event.preventDefault();
  //const clickedElement = this;
  console.log('clickedArticle:', targetArticle);
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list'

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('selektor to ', customSelector)
  let html = '';

  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle)
    /* get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML)
    /* create HTML of the link */
    titleList.insertAdjacentHTML('beforeEnd', linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  console.log(html);

  const links = document.querySelectorAll('.titles a');
  console.log(links)
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* find all articles */

  const articles = document.querySelectorAll('.post');

  let html = '';
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    console.log('wraper, ', tagList);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const taglinkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(taglinkHTML)
      /* add generated code to html variable */
      tagList.insertAdjacentHTML('beforeEnd', taglinkHTML);
      html = html + taglinkHTML;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;
    console.log(html);
  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href:',  href)
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('to jest: ', tag)
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks)
  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(tagLinks)
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');


}

function addClickListenersToTags(){
  console.log('Link was clicked!');
  //console.log(event);
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.list-horizontal a');
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  const articles = document.querySelectorAll('.post');
  let html = '';
  for(let article of articles){
    const authorList = article.querySelector(optArticleAuthorSelector);
    console.log('wraper, ', authorList);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    const authorlinkHTML = '<a href="#' + articleAuthor + '"><span>' + 'by  ' + articleAuthor + '</span></a>';
    console.log('author' + authorlinkHTML)
    authorList.insertAdjacentHTML('beforeEnd', authorlinkHTML);
    html = html + authorlinkHTML;
    authorList.innerHTML = html;
    console.log(html);
  }
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log('href:', href)
  const author = href.replace('#author-', '');
  console.log('to jest: ', author)
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks)
  for(let activeAuthorLink of activeAuthorLinks){
    activeAuthorLink.classList.remove('active');
  }
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks)
  for(let authorLink of authorLinks){
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author~="' + author + '"]');

}

function addClickListenersToAuthors(){
  console.log('Link was clicked!');
  const authorLinks = document.querySelectorAll('.post-author a');
  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
