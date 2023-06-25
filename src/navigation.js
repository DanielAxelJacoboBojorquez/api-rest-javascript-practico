let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    ;
    location.hash = '#search='+searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
    // location.hash = '#home';
    history.back();
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);

function navigator (){
    console.log({location});
    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    }
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    }else if(location.hash.startsWith('#search=')){
        searchPage();
    }else if(location.hash.startsWith('#movie=')){
        movieDetailPage();
    }else if(location.hash.startsWith('#category=')){
        categoriesPage();
    }else{
        homePage();
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    //location.hash
    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
        // infiniteScroll = undefined;
    }
}

function homePage(){
    console.log('Home!!');

    headerSection.classList.remove('header-container--long');
    headerSection.classList.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage(){    
    console.log('categories!!');
    headerSection.classList.remove('header-container--long');
    headerSection.classList.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    //['#cateogry', 'id-name']
    const categoryData = location.hash.split('=')[1];
    const [categoryId, categoryName] = categoryData.split('-');
    headerCategoryTitle.innerHTML=categoryName;
    
    getMoviesByCategory(categoryId);
}

function movieDetailPage(){
    console.log('Movie!!');
    headerSection.classList.add('header-container--long');
    headerSection.classList.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    
    const movieId = location.hash.split('=')[1];
    getMovieById(movieId);
}

function searchPage(){
    console.log('Search!!');
    headerSection.classList.remove('header-container--long');
    headerSection.classList.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const query = location.hash.split('=')[1];
    getMoviesBySearch(query);
}

function trendsPage(){
    console.log('TRENDS!!');
    headerSection.classList.remove('header-container--long');
    headerSection.classList.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML = 'Tendencias';
    getTrendingMovies();
    infiniteScroll = getPaginatedTrendingMovies;
}