import * as R from 'ramda'
const UtilsR = {
  R,

  //// [] ////

  // contains :: a → [a] → Boolean
  contains(val, list) {
    return R.contains(val, list)
  },
  // nth :: Number → [a] → a | Undefined  (head 0 /last -1)
  nth(index, list) {
    return R.nth(index, list)
  },
  // slice :: Number → Number → [a] → [a] (init / tail / take / takeLast)
  slice(fromIndex, toIndex, list) {
    return R.slice(fromIndex, toIndex, list)
  },

  // difference {a∣a∈xs ∩ a∉ys} :: [a] → [a] → [a]
  difference(listA, listB) {
    return R.difference(listA, listB)
  },
  // insert :: Number → a → [a] → [a] (append / prepend)
  insert(insertIndex, val, list) {
    return R.insert(insertIndex, val, list)
  },
  // update :: Number → a → [a] → [a]
  update(index, val, list) {
    return R.update(index, val, list)
  },
  // adjust :: (a → a) → Number → [a] → [a]
  adjust(index, fn, list) {
    return R.adjust(fn, index, list)
  },
  // remove :: Number → Number → [a] → [a] (drop / dropLast)
  remove(fromIndex, number, list) {
    return R.remove(fromIndex, number, list)
  },
  // without {a∣a∉xs ∩ a∈ys} :: [a] → [a] → [a]
  without(listA, listB) {
    return R.without(listA, listB)
  },

  // sum :: [Number] → Number
  sum(filed, list) {
    return R.compose(R.sum, R.pluck(filed))(list)
  },
  // pluck :: Functor f => k → f {k: v} → f v
  pluck(filed, list) {
    return R.pluck(filed)(list)
  },
  // filter :: Filterable f => (a → Boolean) → f a → f a
  filter(fn, list) {
    return R.filter(fn, list)
  },
  // findIndex :: (a → Boolean) → [a] → Number
  findIndex(field, val, list) {
    return R.findIndex(R.propEq(field, val))(list)
  },
  // concat :: [a] → [a] → [a]
  concat(listA, listB) {
    return R.concat(listA, listB)
  },
  //flatten :: [a] → [b]
  flatten(list) {
    return R.flatten(list)
  },

  //// [{}] ////
  // getFullObjByField :: k -> [a] -> [a] -> {k:v}
  getFullObjByField(findField, partArr, fullArr) {
    return R.filter(R.where({ [findField]: R.contains(R.__, partArr) }))(fullArr)  // tslint:disable-line
  },
  // getAnotherField :: k -> [a] -> [a] -> {k:v} -> v
  getAnotherField(anotherField, findField, partArr, fullArr) {
    return this.pluck(anotherField, this.getFullObjByField(findField, partArr, fullArr))
  },
  // getArrObjByFieldValue :: (k->v->[{k:v}]) -> {k:v}
  getArrObjByFieldValue(field, filedValue, list) {
    return this.filter(R.propEq(field, filedValue), list)[0]
  },
  // getArrObjFieldByFieldValue :: k1-> (k->v->[{k:v}]) -> {k1:v1} -> v1
  getArrObjFieldByFieldValue(getField, findField, findFieldValue, list) {
    return R.prop(getField, this.getArrObjByFieldValue(findField, findFieldValue, list))
  },
  //flattenObjArr :: 
  flattenObjArr(filedA, filedB, list) {
    return R.compose(R.pluck(filedB), R.flatten, R.pluck(filedA))(list)
  },
  flattenObjArrSum(filedA, filedB, list) {
    return R.compose(R.sum, R.pluck(filedB), R.flatten, R.pluck(filedA))(list)
  },

  //// {} ////

  // has :: s → {s: x} → Boolean
  has(field, obj) {
    return R.has(field)(obj)
  },
  // keys :: {k: v} → [k]
  keys(obj) {
    return R.keys(obj)
  },
  // values :: {k: v} → [v]
  values(obj) {
    return R.values(obj)
  },

  // prop :: s → {s: a} → a | Undefined
  prop(obj) {
    return R.prop(obj)
  },
  // propOr :: a → String → Object → a
  propOr(defaultVal, fieldsArr, obj) {
    return R.propOr(defaultVal, fieldsArr, obj)
  },
  // [Idx] → {a} → a | Undefined
  // Idx = String | Int
  path(fieldsLevelArr, obj) {
    return R.path(fieldsLevelArr, obj)
  },
  pathOr(defaultVal, fieldsLevelArr, obj) {
    return R.path(defaultVal, fieldsLevelArr, obj)
  },
  // pick :: [k] → {k: v} → {k: v}
  pick(fieldsArr, obj) {
    return R.pick(fieldsArr, obj)
  },

  // assoc/assocPath
  // assoc :: String → a → {k: v} → {k: v}
  assoc(field, val, obj) {
    return R.assoc(field, val, obj)
  },
  // [Idx] → a → {a} → {a}
  // Idx = String | Int
  assocPath(fieldsLevelArr, val, obj) {
    return R.assocPath(fieldsLevelArr, val, obj)
  },

  // dissoc/dissocPath
  // String → {k: v} → {k: v}
  dissoc(field, val, obj) {
    return R.dissoc(field, val, obj)
  },
  // [Idx] → {k: v} → {k: v}
  // Idx = String | Int
  dissocPath(fieldsLevelArr, obj) {
    return R.dissocPath(fieldsLevelArr, obj)
  },
  // omit :: [String] → {String: *} → {String: *}
  omit(fieldsArr, obj) {
    return R.omit(fieldsArr, obj)
  },

  // evolve :: {k: (v → v)} → {k: v} → {k: v}
  evolve(fnOrKV, obj) {
    return R.evolve(fnOrKV, obj)
  },

  // merge :: {k: v} → {k: v} → {k: v}
  merge(objA, objB) {
    return R.merge(objA, objB)
  },

  //// Logic ////

  // defaultTo :: a → b → a | b
  defaultTo(V1, V2) {
    return R.defaultTo(V1, V2)
  },


  //// Base ////
  // trim :: String → String
  trim(str) {
    return R.trim(str)
  },
}

export default UtilsR
