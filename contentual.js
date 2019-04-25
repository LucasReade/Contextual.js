class Contextual{
    /**
     * Creates a new contextual menu
     * @param {object} opts options which build the menu e.g. position and items
     * @param {boolean} opts.isSticky sets how the menu apears, follow the mouse or sticky
     * @param {Array<ContextualItem>} opts.items sets the default items in the menu
     */
    constructor(opts){   
        contextualCore.CloseMenu();

        this.position = opts.isSticky != null ? opts.isSticky : false;
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
     * Adds item to this contextual menu instance
     * @param {ContextualItem} item item to add to the contextual menu
     */
    add(item){
        this.menuControl.appendChild(item);
    }
    /**
     * Makes this contextual menu visible
     */
    show(){
        event.stopPropagation()
        document.body.appendChild(this.menuControl);
        contextualCore.PositionMenu(this.position, event, this.menuControl);    
    }
    /**
     * Hides this contextual menu
     */
    hide(){
        event.stopPropagation()
        contextualCore.CloseMenu();
    }
    /**
     * Toggle visibility of menu
     */
    toggle(){
        event.stopPropagation()
        if(this.menuControl.parentElement != document.body){
            document.body.appendChild(this.menuControl);
            contextualCore.PositionMenu(this.position, event, this.menuControl);        
        }else{
            contextualCore.CloseMenu();
        }
    }
}  
class ContextualItem{
    /**
     * 
     * @param {Object} opts
     * @param {string} [opts.label] 
     * @param {string} [opts.type]
     * @param {Array<ContextualItem>} [opts.submenu]
     * @param {string} [opts.icon]
     * @param {string} [opts.shortcut]
     * @param {void} [opts.onClick] 
     */
    constructor(opts){
        switch(opts.type){
            case 'seperator':
                this.element = contextualCore.CreateEl(`<li class='contextualJs contextualMenuSeperator'><div></div></li>`);
                break;
            case 'submenu':
            case 'normal':
            default:
                this.element = contextualCore.CreateEl( `
                    <li class='contextualJs'>
                        <div class='contextualJs contextualMenuItem'>
                            <img src='${opts.icon == undefined? '' : opts.icon}' class='contextualJs contextualMenuItemIcon'/>
                            <span class='contextualJs contextualMenuItemTitle'>${opts.label == undefined? 'No label' : opts.label}</span>
                            <span class='contextualJs contextualMenuItemOverflow ${opts.type === 'submenu'? '' : 'hidden'}'>
                                <span class='contextualJs contextualMenuItemOverflowLine'></span>
                                <span class='contextualJs contextualMenuItemOverflowLine'></span>
                                <span class='contextualJs contextualMenuItemOverflowLine'></span>
                            </span>
                            <span class='contextualJs contextualMenuItemTip'>${opts.shortcut == undefined? '' : opts.shortcut}</span>
                    </div>
                    <ul class='contextualJs contextualSubMenu contextualMenuHidden'></ul>
                    </li>`);               

                if(opts.submenu !== undefined){
                    let childMenu = this.element.querySelector('.contextualSubMenu');
                            
                    opts.submenu.forEach(i => {
                        childMenu.appendChild(i.element);
                    });
                                
                    this.element.addEventListener('click',function(e){
                        e.currentTarget.classList.toggle('SubMenuActive');
                        childMenu.classList.toggle('contextualMenuHidden');
                    });
                }else{
                    this.element.addEventListener('click', function(){
                        event.stopPropagation();
                        if(opts.onClick !== undefined){ opts.onClick(); }  
                        contextualCore.CloseMenu();
                    });
                }     
        }
    }
}

const contextualCore = {
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
