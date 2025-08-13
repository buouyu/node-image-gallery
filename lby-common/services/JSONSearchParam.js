// import { formatTime } from '../utils/utilFns'

function and(query, type, key, value) {
  if (!query[type]) {
    query[type] = {}
  }
  if (key === '') {
    query[type] = value
    return
  }
  query[type][key] = value
}

// 对应json_search
export default class JSONSearchParam {
  constructor() {
    this.query = {}
    this.querys = [this.query]
  }
  // 或，使用方法:
  // param.or([
  //   ['eq', 'up_user_id', user.id],
  //   ['eq', 'down_user_id', user.id],
  // ])
  or(operators) {
    if (operators.length < 2) {
      throw Error('or must contains at least two operator')
    }
    if (this.querys.length === 2) {
      this.query = this.querys[1]
      return this
    }
    this.query = {}
    this.querys.push(this.query)
    for (let i = 0; i < operators.length; i++) {
      const [type, key, value] = operators[i]
      and(this.query, type, key, value)
    }
    this.query = this.querys[0]
    return this
  }

  eq(key, value) {
    and(this.query, 'eq', key, value)
    return this
  }

  gte(key, value) {
    and(this.query, 'gte', key, value)
    return this
  }

  lte(key, value) {
    and(this.query, 'lte', key, value)
    return this
  }

  gt(key, value) {
    and(this.query, 'gt', key, value)
    return this
  }

  lt(key, value) {
    and(this.query, 'lt', key, value)
    return this
  }

  like(key, value) {
    if (!value) return this
    and(this.query, 'like', key, `%${value}%`)
    return this
  }

  in(key, value) {
    if (!value || value.length === 0) {
      return this
    }
    and(this.query, 'in', key, value)
    return this
  }

  is(key, value = null) {
    and(this.query, 'is', key, value)
    return this
  }
  not(key, value = null) {
    and(this.query, 'not', key, value)
    return this
  }
  between(key, value = null) {
    and(this.query, 'between', key, value)
    return this
  }

  order(value = ['create_time']) {
    and(this.query, 'order', '', value)
    return this
  }

  order_desc(value = ['create_time']) {
    and(this.query, 'order_desc', '', value)
    return this
  }


  toParams() {
    return { json_search: '' + this.toString() }
  }

  toUrlSearchParams() {
    const res = new URLSearchParams()
    res.append('json_search', this.toString())
    return res
  }

  toPageParams({ current, size }) {
    return {
      json_search: '' + this.toString(),
      current,
      size,
    }
  }

  // isEmpty() {
  //   return this.querys.length === 1 && Object.keys(this.query).length === 0
  // }

  toString() {
    if (this.querys.length === 1) {
      return JSON.stringify(this.querys[0])
    }
    return JSON.stringify({
      ...this.querys[0],
      or: this.querys[1],
    })
  }
  toData() {
    if (this.querys.length === 1) {
      return JSON.parse(JSON.stringify(this.querys[0]))
    }
    return JSON.parse(JSON.stringify({
      ...this.querys[0],
      or: this.querys[1],
    }))
  }

  fields(value) {
    and(this.query, 'fields', '', value)
    return this
  }

}
