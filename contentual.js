const contextual = {
    menu: class{
        constructor(opts){
            event.stopPropagation();
            let openMenuItem = document.querySelector('.contextualMenu:not(.contextualMenuHidden)')
            if(openMenuItem != null){
                //There is already a menu open
                document.body.removeChild(openMenuItem);
            }
            this.menuControl = contextual.functions.BuildMenu(opts);
            document.body.appendChild(this.menuControl);
            contextual.functions.PositionMenu(event.target, this.menuControl);

            document.onclick = function(e){
                if(!e.target.classList.contains('contextualJs')){
                    let openMenuItem = document.querySelector('.contextualMenu:not(.contextualMenuHidden)')
                    if(openMenuItem != null){
                        document.body.removeChild(openMenuItem);
                    }
                }
            }
        }
    },
    functions: {
        PositionMenu: (el,menu) => {
            menu.style.left = ((el.offsetLeft + menu.offsetWidth) >= window.innerWidth) ? 
                ((el.offsetLeft - menu.offsetWidth) + el.offsetWidth)+"px"
                    : menu.style.left = (el.offsetLeft)+"px";

            menu.style.top = ((el.offsetTop + menu.offsetHeight) >= window.innerHeight) ?
                (el.offsetTop - menu.offsetHeight)+"px"    
                    : (el.offsetHeight + el.offsetTop)+"px";
        },
        BuildMenu: (menuOptions) => {
            let menuEl = contextual.functions.createEl(`<ul class='contextualJs contextualMenu'></ul>`);
            menuOptions.forEach(element => {menuEl.appendChild(contextual.functions.BuildMenuItem(element));})
            return menuEl;
        },
        BuildMenuItem: (item) => {
            if(item.seperator){
                return contextual.functions.createEl(`<li class='contextualJs contextualMenuSeperator'><div></div></li>`);
            }else{
                let overflowClasses = 'contextualJs contextualMenuItemOverflow';
                if (item.children == undefined){overflowClasses += ' hidden';}
        
                let MenuItem = contextual.functions.createEl( `
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
                        childMenu.appendChild(contextual.functions.BuildMenuItem(i));
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
        createEl: (template) => {
            var el = document.createElement('div');
            el.innerHTML = template;
            return el.firstElementChild;
        }
    }
}
