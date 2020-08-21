# BitDB

### `get`

Get BitDB data by `query`

#### Arguments

1.  query `any`: BitDB Query

#### Result

result `any`: BitDB Result

#### Examples

```javascript
;(async () => {
  let res = await bitbox.BitDB.get({
    v: 3,
    q: {
      db: ["c"],
      find: {},
      limit: 10,
    },
  })
  console.log(res)

  // returns
  // { c:
  //  [ { _id: '5d40924a0f265a358b92401a',
  //      tx: [Object],
  //      in: [Array],
  //      out: [Array],
  //      blk: [Object] },
  //    { _id: '5d40924a0f265a358b924019',
  //      tx: [Object],
  //      in: [Array],
  //      out: [Array],
  //      blk: [Object] },
  //    { _id: '5d40924a0f265a358b924018',
  //      tx: [Object],
  //      in: [Array],
  //      out: [Array],
  //      blk: [Object] },
})()
```
