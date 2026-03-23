// ===== Guide Filter Logic =====
(function() {
  var filterBtns = document.querySelectorAll('#guide-filters .tabs__btn');
  var cards = document.querySelectorAll('.guide-card');
  var countEl = document.getElementById('guide-count');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');
      var visibleCount = 0;

      cards.forEach(function(card) {
        var categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.indexOf(filter) !== -1) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      countEl.textContent = visibleCount;
    });
  });
})();
