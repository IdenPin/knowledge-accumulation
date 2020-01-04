<ul id='list'>
  <li class='item'>item1</li>
  <li class='item'>item2</li>
</ul>




const vDom = {
  tag: 'ul',
  attrs: {
    id: 'list'
  },
  children: [
    {
      tag: 'li',
      attrs: {
        className: 'item'
      },
      children: ['item1']
    },
    {
      tag: 'li',
      attrs: {
        className: 'item'
      },
      children: ['item2']
    }
  ]
}


