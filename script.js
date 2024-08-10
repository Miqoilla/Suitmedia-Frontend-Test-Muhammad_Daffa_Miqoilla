document.addEventListener("DOMContentLoaded", function () {
    var prevScrollpos = window.pageYOffset;

    window.addEventListener('scroll', function () {
        var currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos) {
            // Scrolling up
            document.querySelector('.scrolling-navbar').classList.remove('hidden');
        } else {
            // Scrolling down
            document.querySelector('.scrolling-navbar').classList.add('hidden');
        }

        prevScrollpos = currentScrollPos;
    });

    var selectElement = document.getElementById('floatingSelect');
    selectElement.addEventListener('change', handleSelectChange);

    var sortBySelectElement = document.getElementById('sortBySelect');
    sortBySelectElement.addEventListener('change', handleSortByChange);
    
    window.onscroll = handleScroll;
    generateCards();

    var initialShowPerPage = getShowPerPageFromLocalStorage() || 90;
    adjustCardDisplay(initialShowPerPage);
    selectElement.value = initialShowPerPage;
    updateShowingText(initialShowPerPage);



    function handleSelectChange() {
        var selectedValue = parseInt(selectElement.value);
        saveShowPerPageToLocalStorage(selectedValue);
        localStorage.setItem('selectedValue', selectedValue);
        adjustCardDisplay(selectedValue);
        updateShowingText(selectedValue);
    }

   

    function updateShowingText(selectedValue) {
        var showingTextElement = document.querySelector('#sort-list .text');
        var upperBound = selectedValue < 100 ? selectedValue : 100;
        showingTextElement.textContent = `Showing 1 - ${upperBound} of 100`;
    }

    function adjustCardDisplay(cardsPerPage) {
        var cards = document.querySelectorAll('.card');
        cards.forEach(function (card, index) {
            card.style.display = 'none';
        });

        for (var i = 0; i < cardsPerPage && i < cards.length; i++) {
            cards[i].style.display = 'block';
        }
    }

    function handleSortByChange() {
        var selectedSortValue = sortBySelectElement.value;
        saveSortByToLocalStorage(selectedSortValue);
        sortCards(selectedSortValue);
    }




    function handleScroll() {
        const currentScrollPos = window.pageYOffset;

        const bannerImage = document.querySelector(".banner img");
        bannerImage.style.transform = `translateY(${-currentScrollPos * 0.7}px)`;

        const bannerText = document.querySelector(".banner-text h1");
        bannerText.style.transform = `translateX(${-currentScrollPos * 0.7}px)`;

        const bannerText2 = document.querySelector(".banner-text p");
        bannerText2.style.transform = `translateX(${-currentScrollPos * 0.7}px)`;

        const header = document.querySelector("header");
        header.classList.toggle("inactive", prevScrollpos <= currentScrollPos);

        prevScrollpos = currentScrollPos;
    }


    
});