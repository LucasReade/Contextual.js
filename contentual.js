class ContextualMenuElement{
    element
}

const Contextual = {
    Menu: class {
        /**
         * 
         * @param {object} opts
         * @param {contextualCore.position} opts.position
         * @param {Array<ContextualMenuElement>} opts.items
         */
        constructor(opts){   
            contextualCore.CloseMenu();

            this.position = opts.position != null ? opts.position : false;
            this.menuControl = contextualCore.CreateEl(`<ul class='contextualJs contextualMenu'></ul>`);
            opts.items.forEach(i => {
                this.menuControl.appendChild(i.element);
            });
            
            if(event != undefined){
                event.stopPropagation()
                document.body.appendChild(this.menuControl);
                contextualCore.PositionMenu(this.position, event, this.menuControl);        
            }

            document.onclick = function(e){
                if(!e.target.classList.contains('contextualJs')){
                    contextualCore.CloseMenu();
                }
            }    
        }
        /**
         * 
         * @param {ContextualMenuElement} item 
         */
        add(item){
            this.menuControl.appendChild(item);
        }
        show(){
            event.stopPropagation()
            document.body.appendChild(this.menuControl);
            contextualCore.PositionMenu(this.position, event, this.menuControl);    
        }
        hide(){
            event.stopPropagation()
            contextualCore.CloseMenu();
        }
        toggle(){
            event.stopPropagation()
            if(this.menuControl.parentElement != document.body){
                document.body.appendChild(this.menuControl);
                contextualCore.PositionMenu(this.position, event, this.menuControl);        
            }else{
                contextualCore.CloseMenu();
            }
        }
    },
    Item: class extends ContextualMenuElement{
        /**
         * 
         * @param {string} title 
         * @param {string} hint 
         * @param {string} icon 
         * @param {void} onclick 
         */
        constructor(title, hint, icon, onclick){
            super();
            this.element = contextualCore.CreateEl( `
            <li class='contextualJs'>
                <div class='contextualJs contextualMenuItem'>
                    <img src='${icon}' class='contextualJs contextualMenuItemIcon'/>
                    <span class='contextualJs contextualMenuItemTitle'>${title}</span>
                    <span class='contextualJs contextualMenuItemOverflow hidden'>
                        <span class='contextualJs contextualMenuItemOverflowLine'></span>
                        <span class='contextualJs contextualMenuItemOverflowLine'></span>
                        <span class='contextualJs contextualMenuItemOverflowLine'></span>
                    </span>
                    <span class='contextualJs contextualMenuItemTip'>${hint}</span>
                </div>
                <ul class='contextualJs contextualSubMenu contextualMenuHidden'></ul>
            </li>`); 
            
            this.element.addEventListener('click', function(){
                event.stopPropagation(); 
                onclick();
                contextualCore.CloseMenu();
            });
        }
    },
    Seperator: class extends ContextualMenuElement{
        constructor(){
            super();
            this.element = contextualCore.CreateEl(`<li class='contextualJs contextualMenuSeperator'><div></div></li>`)
        }
    },
    ChildMenu: class extends ContextualMenuElement{
        /**
         * 
         * @param {string} title 
         * @param {string} hint 
         * @param {string} icon 
         * @param {Array<ContextualMenuElement>} children 
         */
        constructor(title, hint, icon, children){        
            super();        
            this.element = contextualCore.CreateEl(`
            <li class='contextualJs'>
                <div class='contextualJs contextualMenuItem'>
                    <img src='${icon}' class='contextualJs contextualMenuItemIcon'/>
                    <span class='contextualJs contextualMenuItemTitle'>${title}</span>
                    <span class='contextualJs contextualMenuItemOverflow'>
                        <span class='contextualJs contextualMenuItemOverflowLine'></span>
                        <span class='contextualJs contextualMenuItemOverflowLine'></span>
                        <span class='contextualJs contextualMenuItemOverflowLine'></span>
                    </span>
                    <span class='contextualJs contextualMenuItemTip'>${hint}</span>
                </div>
                <ul class='contextualJs contextualSubMenu contextualMenuHidden'></ul>
            </li>`);

            let childMenu = this.element.querySelector('.contextualSubMenu');
                    
            children.forEach(i => {
                childMenu.appendChild(i.element);
            });
                    
            this.element.addEventListener('click',function(e){
                e.currentTarget.classList.toggle('SubMenuActive');
                childMenu.classList.toggle('contextualMenuHidden');
            });
        }
    },
}

const contextualCore = {
    position: {
        docked: true,
        free: false,
    },
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
    CloseMenu: () => {
        let openMenuItem = document.querySelector('.contextualMenu:not(.contextualMenuHidden)');
        if(openMenuItem != null){ document.body.removeChild(openMenuItem); }      
    },
    CreateEl: (template) => {
        var el = document.createElement('div');
        el.innerHTML = template;
        return el.firstElementChild;
    }
};
