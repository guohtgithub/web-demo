import Vue from 'vue'
import store from '@/store'
import {$get, $post} from "../../axios";
import {Notification} from 'element-ui'
import i18n from '@/i18n'
import throttle from 'lodash.throttle'
import {
  promiseBreaker,
  transferKlineReqTime,
  loopRun,
  parseBarTime
} from "./tools";
import {createNamespacedHelpers} from 'vuex'
const {mapState, mapGetters, mapMutations} = createNamespacedHelpers('pairs')

const WS_URL = document.location.protocol === 'https:'?"wss://ws.auxb.io":process.env.WS_URL
let wsFirstTime = '';
let wsFirst = '';

// const filterEven = (t, i) => !(i % 2)
// const filterOdd = (t, i) => i % 2
// const orderPriceSortAsc = (a, b) => a.p - b.p
// const orderPriceSortDesc = (a, b) => b.p - a.p
const toNumber = str => +str
const strToHisTick = str => {
  let [, type, time, price, amount] = str.split('|')
  return {
    type: +type,
    time: +time,
    price: +price,
    amount: +amount
  }
}
const returnNull = () => null
/* const findSomePrice = function (ask) {
  return ask.p === +this
} */

function notificationFun (type, tip) {
  Notification.closeAll();
  Notification[type]({
    title: i18n.t('COINS'), // 币币交易
    message: tip,
    offset: 88
  })
}
let throttleNotification = throttle(notificationFun, 800);// 限制操作频率的函数

let wsStrategies = (function () {
  let tickCache = []
  // let positionPushCache = []
  // tickCache.loopRun = positionPushCache.loopRun = loopRun
  tickCache.loopRun = loopRun
  let tickStategy = async function (msg) {
    let data = msg.Data || {}
    let [symbol, type, time, latest, volume] = data.split('|')
    let [t, b] = symbol.split('/')
    let {
      high,
      low,
      open,
      vol = 0,
      fav
    } = this.allPairSymbols[b][t]
    if (symbol === this.klineSymbol) {
      this.updateTradeHistory({
        add: true,
        data: {
          type: +type,
          time: +time,
          price: +latest,
          amount: +volume
        }
      })
      this.$emit('newBar', {
        time: time * 1000,
        close: +latest,
        vol: +volume
      })
    }
    await this.snapshotReady
      .catch(returnNull)
    this.marketOverview({
      b,
      t,
      close: +latest,
      high: Math.max(high, +latest),
      low: Math.min(low, +latest) || +latest,
      open: open || +latest,
      vol: vol + (+volume),
      fav
    })
  }
  /* let positionPushStategy = async function (msg) {
    let {
      spliceAsks,
      spliceBids
    } = this
    let ask = msg.Ask
    let bid = msg.Bid
    let {asks, bids} = this.marketDepth
    if (ask) {
      let [p, a] = ask.split('|').map(toNumber)
      let obj = {
        p,
        a
      }
      let idx = asks.findIndex(findSomePrice, p)
      if (a === 0) {
        if (~idx) spliceAsks([idx, 1])
        return
      }
      if (~idx) return spliceAsks([idx, 1, obj])

      if (!asks.length || p > asks[0].p) {
        if (asks.length < 20) {
          spliceAsks([0, 0, obj])
        }
      } else if (!asks.length || p < asks[asks.length - 1].p) {
        spliceAsks([asks.length, 0, obj])
      } else {
        for (let i = 0, len = asks.length; i < len; i++) {
          if (p > asks[i].p) {
            spliceAsks([i, 0, obj])
            break
          }
        }
      }
    } else if (bid) {
      let [p, a] = bid.split('|').map(toNumber)
      let obj = {
        p,
        a
      }
      let idx = bids.findIndex(findSomePrice, p)
      if (a === 0) {
        if (~idx) spliceBids([idx, 1])
        return
      }
      if (~idx) return spliceBids([idx, 1, obj])
      if (!bids.length || p < bids[bids.length - 1].p) {
        if (bids.length < 20) {
          spliceBids([bids.length, 0, obj])
        }
      } else if (!bids.length || p > bids[0].p) {
        spliceBids([0, 0, obj])
      } else {
        for (let i = 0, len = bids.length; i < len; i++) {
          if (p > bids[i].p) {
            spliceBids([i, 0, obj])
            break
          }
        }
      }
    }
  } */
  return {
    snapshot (msg) {
      tickCache.length = 0
      let data = msg.Data || {}
      let obj = {}
      let nowDate = +transferKlineReqTime(msg.Now * 1000)
      Object.keys(data).forEach(symbol => {
        let [targetCoin, baseCoin] = symbol.split('/')
        let [date, open, high, low, close, vol] = data[symbol].split('|').map(toNumber)
        obj[baseCoin] = this.allPairSymbols[baseCoin] || {}
        let fav = obj[baseCoin][targetCoin]['fav']
        obj[baseCoin][targetCoin] = date === nowDate
          ? {
            close,
            high,
            low,
            open,
            vol,
            fav
          }
          : {
            close,
            high: close,
            low: close,
            open: close,
            vol: 0,
            fav
          }
      })
      let daySeconds = 60 * 60 * 24
      let dayTimeoutSeconds = daySeconds - msg.Now % daySeconds
      clearTimeout(this.snapshotTimeout)
      this.snapshotTimeout = setTimeout(() => this.subMktOverView(), dayTimeoutSeconds * 1000)
      this.marketOverview(obj)
      this.snapshotReady.resolve()
    },
    histick (msg) {
      let data = msg.Data || {}
      if (~((data[0] + '').indexOf(this.klineSymbol))) {
        let arr = data.map(strToHisTick).reverse()
        this.updateTradeHistory({
          replace: true,
          data: arr
        })
      }
    },
    tick (msg) {
      if (tickCache.push(msg) > 100) {
        tickCache.length = 0
        return this.subMktOverView()
      } else if (!tickCache.looping) {
        tickCache.loopRun(msg => tickStategy.call(this, msg))
      }
    },
    /* position (msg) {
      positionPushCache.length = 0
      let buy = msg.Bid || ''
      let sell = msg.Ask || ''
      let arrBuy = buy.split('|')
      let buyPrices = arrBuy.filter(filterEven)
      let buyAmounts = arrBuy.filter(filterOdd)
      let arrSell = sell.split('|')
      let sellPrices = arrSell.filter(filterEven)
      let sellAmounts = arrSell.filter(filterOdd)
      let asks = []
      let bids = []
      buy && buyPrices.forEach((p, i) => {
        bids.push({
          p: +p,
          a: +buyAmounts[i]
        })
      })
      sell && sellPrices.forEach((p, i) => {
        asks.push({
          p: +p,
          a: +sellAmounts[i]
        })
      })
      asks.sort(orderPriceSortDesc)
      bids.sort(orderPriceSortDesc)
      this.updateMarketDepth({
        asks,
        bids
      })
      this.initPriceProvider()
    },
    'position-push' (msg) {
      return false
      if (positionPushCache.push(msg) > 20) {
        positionPushCache.length = 0
        this.subMarketDepth()
      } else if (!positionPushCache.looping) {
        positionPushCache.loopRun(msg => positionPushStategy.call(this, msg))
      }
    }, */
    orderbook (msg) {
      let {asks, bids} = msg;
      this.updateMarketDepth({
        asks,
        bids
      })
      if (store.state.pairs.isNeedPriceProvider) {
        this.initPriceProvider();
        this.$store.commit('pairs/updateIsNeedPriceProvider', false)
      }
    },
    k (msg) {
      this.$emit('kHistory', msg)
    },
    async orderstatus (msg) {
      let status = msg.Status
      let tip, type, change
      switch (status) {
        case '4':
          tip = i18n.t('orderLong.part') // 您的币币委托有部分成交
          type = 'info'
          change = true
          break
        case '5':
          let res = await $get(`/v1/trader/entrust/checkType?consignId=${msg.Orderid}`)
            .catch(returnNull)
          if (res && res._statusOk && res.data.entrustType !== 2) {
            tip = i18n.t('orderLong.completed') // '您的币币委托已全部成交！'
            type = 'success'
            change = true
          }
          break
        case '6':
          tip = i18n.t('orderLong.cancellations') // '您的币币委托已部分撤单！'
          type = 'info'
          change = true
          break
        case '7':
          tip = i18n.t('orderLong.all') // '您的币币委托已完整撤单！'
          type = 'success'
          change = true
          break
      }
      if (tip && !store.state.user.dontPairsTip) {
        if (status === '4') {
          throttleNotification(type, tip);
        } else {
          Notification.closeAll();
          Notification[type]({
            title: i18n.t('COINS'), // 币币交易
            message: tip,
            offset: 88
          })
        }
      }
      if (change) {
        status !== '4' && this.$store.dispatch('pairs/getBalance')
        this.$emit('pairsOrderDone', msg)
      }
    },
    login () {},
    pong () {}
  }
})()

let wsBus = window.wsBus = new Vue({
  store,
  data: {
    ws: null,
    connectReady: promiseBreaker(), // 将是可外部决议的promise
    snapshotReady: promiseBreaker(),
    snapshotTimeout: null,
    isReconnect: false
  },
  computed: {
    ...mapState([
      'quotationBaseCoin',
      'baseCoin',
      'targetCoin',
      'allSymbolsReady',
      'allPairSymbols',
      'marketDepth',
      'uid',
    ]),
    ...mapGetters([
      'klineSymbol',
    ]),
    refreshToken () {
      return this.$store.state.user.refreshToken
    }
  },
  watch: {
    refreshToken: {
      handler: 'wsLogin'
    }
  },
  methods: {
    ...mapMutations([
      'marketOverview',
      'updateTradeHistory',
      'updateMarketDepth',
      'initPriceProvider',
      'spliceAsks',
      'spliceBids',
    ]),
    init () {
      let ws = this.ws = new WebSocket(WS_URL);
      ws.onopen = async () => {
        console.time('beforeSocketClose')
        this.$emit('connect', this.isReconnect)
        console.log('ws open');
        this.connectReady.resolve()
        this.subMktOverView()
        // this.subMarketDepth()
        this.wsLogin()
      }
      ws.onmessage = async ev => {
        let msg = JSON.parse(ev.data)
        return wsStrategies[msg.Topic].call(this, msg)
      }
      ws.onclose = () => {
        console.timeEnd('beforeSocketClose')
        this.isReconnect = true
        this.connectReady = promiseBreaker()
        console.log('ws close')
        setTimeout(() => this.init(), 3000)
      }
      ws.onerror = err => {
        console.log('ws error', err);
        // this.init();
      }
    },
    async reqKlinHistory (symbol, resolution, from, to) { // 请求k线历史数据
      await this.connectReady
      let promise = promiseBreaker()
      let period
      switch (resolution) {
        case 'D':
          period = '1d'
          break
        case 'W':
          period = '7d'
          break
        case '4W':
          period = '28d'
          break
        default:
          period = resolution + 'm'
      }
      let type = ~period.indexOf('m') ? 'dateTime' : 'date'
      if (wsFirstTime === '' || wsFirstTime / 1000 < to) {
        this.ws.send(JSON.stringify({
          "topic": "k",
          "symbol": symbol,
          "period": period,
          "to": transferKlineReqTime(to * 1000, type),
          "from": transferKlineReqTime(from * 1000, type)
        }))
        this.$once('kHistory', msg => {
          wsFirstTime = parseBarTime(msg.First)
          wsFirst = msg.First
          if (from < wsFirstTime / 1000 && wsFirstTime / 1000 < to) {
            $post('/v1/hisk', {
              "topic": "k",
              "symbol": symbol,
              period,
              "from": transferKlineReqTime(from * 1000, type),
              "to": wsFirst
            }).then(function (m) {
              msg.Data = Object.assign({}, m.data.Data, msg.Data);
              promise.resolve(msg)
            })
          } else {
            promise.resolve(msg)
          }
        })
      } else {
        $post('/v1/hisk', {
          "topic": "k",
          "symbol": symbol,
          period,
          "from": transferKlineReqTime(from * 1000, type),
          "to": transferKlineReqTime(to * 1000, type)
        }).then(function (msg) {
          promise.resolve(msg.data)
        })
      }
      return promise
    },
    async subMarketDepth (unsubSymbol) {
      await this.connectReady
      this.$store.commit('pairs/updateIsNeedPriceProvider', true)
      this.ws.send(JSON.stringify({
        "topic": "position",
        "symbol": this.klineSymbol,
        depth: 20,
        unsubscribe: unsubSymbol ? [unsubSymbol] : []
      }))
    },
    async unsubMarketDepth (unsubSymbol) {
      await this.connectReady
      this.ws.send(JSON.stringify({
        "topic": "position",
        "symbol": "",
        depth: 20,
        unsubscribe: [unsubSymbol]
      }))
    },
    async subMktOverView () {
      await this.connectReady
      await this.allSymbolsReady
      this.ws.send(JSON.stringify({
        "topic": "snapshot",
        "subscribe": Object.keys(this.allPairSymbols)
      }))
    },
    async reqHisTick () {
      this.updateTradeHistory({
        replace: true,
        data: []
      })
      await this.connectReady
      this.ws.send(JSON.stringify({
        topic: 'histick',
        symbol: this.klineSymbol
      }))
    },
    async wsLogin () {
      await this.connectReady
      let tk = this.refreshToken
      tk && this.ws.send(JSON.stringify({
        topic: 'login',
        user_id: this.uid,
        refresh_token: tk
      }))
    }
  },
  async created () {
    console.log('wsBus created!')
    this.init()
    setInterval(() => this.ws.send(JSON.stringify({
      topic: 'ping'
    })), 60 * 1000)
  }
})

export default wsBus
