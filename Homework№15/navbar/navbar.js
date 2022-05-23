class Navbar{
    static CLASSES = {
        iconContainer : 'navbar-icon',
        iconLine : 'navbar-icon__line',
        menuContainer : 'navbar-menu',
        menuLinks : 'navbar-link',
        menuActive : 'active',
        hoverLink : 'hover',
    };
    constructor(elem) {
        this.navbarContainer = elem;
        const [navbarIco,navbarMenu] = this.navbarContainer.children;
        this.navbarMenu = navbarMenu;
        this.navbarIco= navbarIco;
        this.setClasses();
        this.navbarContainer.addEventListener('click',this.funcForClick)
        this.navbarMenu.addEventListener('mouseover',this.toggleHoverClassForLink)
    };
    setClasses = () => {
        this.setClass(this.navbarIco,Navbar.CLASSES.iconContainer,Navbar.CLASSES.iconLine);
        this.setClass(this.navbarMenu,Navbar.CLASSES.menuContainer,Navbar.CLASSES.menuLinks);
    };
    setClass(container,containerClass,containerChildClass){
        container.classList.add(containerClass);
       
        [...container.children].forEach((elem) => {
            elem.classList.add(containerChildClass);
        });
    };

    toggleMenu = () =>{
        this.navbarMenu.classList.toggle(Navbar.CLASSES.menuActive);
    }
    
    validateClassName(event,className,func){
        if (event.target.closest('.'+className)){
            
            func();
           
        }
    }
    funcForClick = (event) =>{
        this.validateClassName(event,Navbar.CLASSES.menuLinks,this.toggleMenu);
     
        this.validateClassName(event,Navbar.CLASSES.iconContainer,this.toggleMenu);
        
    }
    toggleHoverClassForLink = (event) => {
        [...this.navbarMenu.children].forEach((elem) => {
            elem.classList.remove(Navbar.CLASSES.hoverLink);
        });
        event.target.classList.add(Navbar.CLASSES.hoverLink);
    }
}