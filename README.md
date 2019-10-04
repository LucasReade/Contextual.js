# Contextual.js
Javascript contextual menu library - Create dynamic right click or popup menus.

## Menu 

### Options
- isSticky
- width
- items

## Menu items

### Types
- Sub menus
- Seperators
- Buttons
- Custom element

### Options 
- icon
- cssIcon
- label
- type
- onClick
- shortcut
- submenu
- markup
- enabled

## Examples

### Bit of everything
```
new Contextual({
  isSticky: false,
  width: '250px',
  items:[
    new ContextualItem({type:'custom', markup: `
      <div>
        <span>Custom item - add what you like</span>    
      </div>
    ` }),
    new ContextualItem({label:'Button', onClick: () => {console.log('Item 1 clicked')}, shortcut:'Ctrl+A' }),
    new ContextualItem({type:'seperator'}),
    new ContextualItem({type:'submenu', label:'Sub menu', submenu:[
      new ContextualItem({label:'Subitem 1'}),
      new ContextualItem({label:'Subitem 2'}),
      new ContextualItem({label:'Subitem 3'}),
    ]}),
    new ContextualItem({label:'Disabled button', shortcut:'Ctrl+B', enabled: false }),
  ]
 });
```

