class Navbar{
    static CLASSES = {
        iconContainer : 'navbar-icon',
        //контейнер иконки
        iconLine : 'navbar-icon__line',
        //иконка
        menuContainer : 'navbar-menu',
        // hamburger-menu
        //контейнер меню
        menuLinks : 'navbar-link',
        // hamburger-menu__link
        //ссылки в меню
        menuActive : 'active',
        //раскрытое меню
        hoverLink : 'hover',
    };
    constructor(elem) {
        this.navbarContainer = elem;
        //Контейнер всего меню
        const [navbarIco,navbarMenu] = this.navbarContainer.children;
        //Массив из двух контейнеров
        // - иконка
        // - меню
        this.navbarMenu = navbarMenu;
        //Контейнер меню
        this.navbarIco= navbarIco;
        //Контейнер иконки
        this.setClasses();
        //добавляем классы всем элементам
        this.navbarContainer.addEventListener('click',this.funcForClick)
        //при клике на бургер показываем меню
        this.navbarMenu.addEventListener('mouseover',this.toggleHoverClassForLink)
    };
    setClasses = () => {
        this.setClass(this.navbarIco,Navbar.CLASSES.iconContainer,Navbar.CLASSES.iconLine);
        //добавляем все классы контейнеру ico и его дочерним элементам
        this.setClass(this.navbarMenu,Navbar.CLASSES.menuContainer,Navbar.CLASSES.menuLinks);
        //добавляем все классы контейнеру menu и его дочерним элементам
    };
    setClass(container,containerClass,containerChildClass){
        container.classList.add(containerClass);
        //добавляем класс контейнеру
        [...container.children].forEach((elem) => {
            elem.classList.add(containerChildClass);
        });
        //добавляем класс всем дочкам элемента
    };
    toggleMenu = () =>{
        this.navbarMenu.classList.toggle(Navbar.CLASSES.menuActive);
        //добавляет и убирает класс active
    }
    validateClassName(event,className,func){
        if (event.target.closest('.'+className)){
            //Если user кликнул по контейнеру закрывающимся классом className
            func();
            //то запускается данная функция
        }
    }
    funcForClick = (event) =>{
        this.validateClassName(event,Navbar.CLASSES.menuLinks,this.toggleMenu);
        //Для клика по Hamburger link
        this.validateClassName(event,Navbar.CLASSES.iconContainer,this.toggleMenu);
        //Для клика по Hamburger ico
    }
    toggleHoverClassForLink = (event) => {
        [...this.navbarMenu.children].forEach((elem) => {
            elem.classList.remove(Navbar.CLASSES.hoverLink);
        });
        event.target.classList.add(Navbar.CLASSES.hoverLink);
    }
}