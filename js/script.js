$('.menu-btn').click(function(){
	$(this).toggleClass('menu-btn--active');
	$('.header__menu').toggleClass('header__menu--open');
})
$('.header__menu a[href^="#"]').click(function(e){
	e.preventDefault();
	var target = $(this.hash),
			top = target.offset().top;
	if(innerWidth < 1320){
		top -= $('.header').outerHeight()
	}
	
	if(target.length){		
		$('html,body').animate({
			scrollTop: top
		},500,function(){
			//intersectionObserver не всегда корректно определяет элемент после такой прокрутки, особенно если просматриваемых секций несколько на экране
			//Поэтому перестраховываюсь
			$(e.target).parent().addClass('active').siblings().removeClass('active');
		});
		$('.menu-btn').removeClass('menu-btn--active');
		$('.header__menu').removeClass('header__menu--open');
	}
})

//Навигация по странице
function pageNav(entries, observer){
  var element = entries[0].target;
	if(entries[0].isIntersecting && element.id){
		$('.header__nav .active').removeClass('active');
		$('.header__nav a').filter('[href="#'+element.id+'"]').parent().addClass('active');
	}
};
$('.page-section').each(function(){
	var sectionObserver = new IntersectionObserver(pageNav,{threshold: .2, rootMargin: '-70px 0px -50% 0px'});
	sectionObserver.observe(this);
})

//карта
$('[data-coords][id]').each(function(){
	var map = this;
	/* ymaps.ready(function(){
		initMap(map);
	}); */
})
function initMap(map){
	var coords = $(map).data('coords').replace(/[^\d\,\.]/g,'').split(',') || [];			
	
	var myMap = new ymaps.Map(map.id, {
		center: coords,
		zoom: 14,
		controls: []
	});					
	myPlacemark = new ymaps.Placemark(coords, 
		{
			hintContent: '',
			balloonContent: ''
		}
	);
	myMap.geoObjects.add(myPlacemark);
}