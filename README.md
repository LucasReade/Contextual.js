# Contextual.js
Javascript contextual menu library - Create dynamic right click or popup menus.

## Menu Items
- Sub menus
- Seperators
- Buttons

## Examples

### Basic menu
```
new Contextual({
  isSticky: false,
  items:[
    new ContextualItem({label:'Item 1', onClick: () => {console.log('Item 1 clicked')} }),
    new ContextualItem({type:'seperator'}),
    new ContextualItem({label:'Item 2', shortcut:'Ctrl+B' }),
  ]
});
```

### Menu with sub items
```
new Contextual({
  isSticky: true,
	items:[
    new ContextualItem({label:'Item 1', onClick: () => {console.log('Item 1 clicked')}, shortcut:'Ctrl+A' }),
    new ContextualItem({type:'seperator'}),
    new ContextualItem({type:'submenu', label:'Item 2', submenu:[
      new ContextualItem({label:'Subitem 1'}),
      new ContextualItem({label:'Subitem 2'}),
      new ContextualItem({label:'Subitem 3'}),
    ]}),
  	new ContextualItem({label:'Item 3', shortcut:'Ctrl+B' }),
	]
});
```

