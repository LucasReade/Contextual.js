class contextualMenu{
    constructor(opts){
        event.stopPropagation();   
        contextualCoreFunctions.CloseMenu();

        this.docked = opts.docked != null ? opts.docked : false;
        this.menuControl = contextualCoreFunctions.BuildMenu(opts.items);
        
        document.body.appendChild(this.menuControl);
        contextualCoreFunctions.PositionMenu(this.docked, event, this.menuControl);

        document.onclick = function(e){
            if(!e.target.classList.contains('contextualJs')){
                let openMenuItem = document.querySelector('.contextualMenu:not(.contextualMenuHidden)')
                if(openMenuItem != null){
                    document.body.removeChild(openMenuItem);
                }
            }
        }
        
    }
}

const contextualCoreFunctions = {
    PositionMenu: (docked, el, menu) => {
        if(docked){
            menu.style.left = ((el.target.offsetLeft + menu.offsetWidth) >= window.innerWidth) ? 
                ((el.target.offsetLeft - menu.offsetWidth) + el.target.offsetWidth)+"px"
                    : (el.target.offsetLeft)+"px";

            menu.style.top = ((el.target.offsetTop + menu.offsetHeight) >= window.innerHeight) ?
                (el.target.offsetTop - menu.offsetHeight)+"px"    
                    : (el.target.offsetHeight + el.target.offsetTop)+"px";
        }else{
            menu.style.left = ((el.clientX + menu.offsetWidth) >= window.innerWidth) ?
                ((el.clientX - menu.offsetWidth))+"px"
                    : (el.clientX)+"px";

            menu.style.top = ((el.clientY + menu.offsetHeight) >= window.innerHeight) ?
                (el.clientY - menu.offsetHeight)+"px"    
                    : (el.clientY)+"px";
        }
    },
    BuildMenu: (menuOptions) => {
        let menuEl = contextualCoreFunctions.createEl(`<ul class='contextualJs contextualMenu'></ul>`);
        menuOptions.forEach(element => {menuEl.appendChild(contextualCoreFunctions.BuildMenuItem(element));})
        return menuEl;
    },
    BuildMenuItem: (item) => {
        if(item.seperator){
            return contextualCoreFunctions.createEl(`<li class='contextualJs contextualMenuSeperator'><div></div></li>`);
        }else{
            let overflowClasses = 'contextualJs contextualMenuItemOverflow';
            if (item.children == undefined){overflowClasses += ' hidden';}
    
            let MenuItem = contextualCoreFunctions.createEl( `
            <li class='contextualJs'>
                <div class='contextualJs contextualMenuItem'>
                    <img src='${item.icon}' class='contextualJs contextualMenuItemIcon'/>
                    <span class='contextualJs contextualMenuItemTitle'>${item.title}</span>
                    <span class='${overflowClasses}'>
                        <span class='contextualJs contextualMenuItemOverflowLine'></span>
                        <span class='contextualJs contextualMenuItemOverflowLine'></span>
                        <span class='contextualJs contextualMenuItemOverflowLine'></span>
                    </span>
                    <span class='contextualJs contextualMenuItemTip'>${item.tip}</span>
                </div>
                <ul class='contextualJs contextualSubMenu contextualMenuHidden'></ul>
            </li>`);
    
            if(item.children){
                let childMenu = MenuItem.querySelector('.contextualSubMenu');
                
                item.children.forEach(i => {
                    childMenu.appendChild(contextualCoreFunctions.BuildMenuItem(i));
                });
                
                MenuItem.addEventListener('click',function(){
                    MenuItem.classList.toggle('SubMenuActive');
                    childMenu.classList.toggle('contextualMenuHidden');
                });
            }else{
                MenuItem.addEventListener('click', function(){
                    event.stopPropagation(); 
                    item.onclick();
                    let openMenuItem = document.querySelector('.contextualMenu:not(.contextualMenuHidden)')
                    if(openMenuItem != null){
                        document.body.removeChild(openMenuItem);
                    }
                });
            }
            return MenuItem;
        }
    },
    CloseMenu: () => {
        let openMenuItem = document.querySelector('.contextualMenu:not(.contextualMenuHidden)');
        if(openMenuItem != null){ document.body.removeChild(openMenuItem); }      
    },
    createEl: (template) => {
        var el = document.createElement('div');
        el.innerHTML = template;
        return el.firstElementChild;
    }
};

