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
- Hover menus
- Seperators
- Buttons
- Custom element
- Multi buttons (WIP)

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
  isSticky: true,
  width: '250px',
  items: [
    {type: 'custom', markup: `<span>Custom item - add what you like</span>`},
    {type: 'multi', items: [
      {label: 'Copy', onClick: () => {console.log('Copy!')}},
      {label: 'Cut', onClick: () => {console.log('Cut!')}},
      {label: 'Paste', onClick: () => {console.log('Paste!')}},
    ]},
    {label: 'Button', onClick: () => {console.log('Item 1 clicked')}, shortcut: 'Ctrl+A'},
    {type: 'seperator'},
    {type: 'submenu', label: 'Sub menu', items: [
      {label: 'Subitem 1', onClick: () => {}},
      {label: 'Subitem 2', onClick: () => {}},
      {label: 'Subitem 3', onClick: () => {}},
    ]},
    {type: 'hovermenu', label: 'Hover menu', items: [
      {label: 'Subitem 1', onClick: () => {}},
      {label: 'Subitem 2', onClick: () => {}},
      {label: 'Subitem 3', onClick: () => {}},
    ]},
    {label: 'Disabled button', onClick: () => {}, shortcut: 'Ctrl+B', enabled: false},
  ]
});
```

