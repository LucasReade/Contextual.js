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
- Multi buttons

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
      {label: 'Copy'},
      {label: 'Cut'},
      {label: 'Paste'},
    ]},
    {label: 'Button', onClick: () => {console.log('Item 1 clicked')}, shortcut: 'Ctrl+A'},
    {type: 'seperator'},
    {type: 'submenu', label: 'Sub menu', submenu: [
      {label: 'Subitem 1'},
      {label: 'Subitem 2'},
      {label: 'Subitem 3'},
    ]},
    {label: 'Disabled button', shortcut: 'Ctrl+B', enabled: false},
  ]
});
```

