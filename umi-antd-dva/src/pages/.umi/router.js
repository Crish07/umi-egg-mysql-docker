import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    '0': '全',
    '1': '局',
    '2': '布',
    '3': '局',
    '4': ' ',
    '5': '@',
    '6': 'A',
    '7': 'u',
    '8': 't',
    '9': 'h',
    '10': 'o',
    '11': 'r',
    '12': ' ',
    '13': 'C',
    '14': 'r',
    '15': 'i',
    '16': 's',
    '17': 'h',
    '18': '<',
    '19': '7',
    '20': '1',
    '21': '4',
    '22': '4',
    '23': '1',
    '24': '5',
    '25': '4',
    '26': '7',
    '27': '3',
    '28': '@',
    '29': 'q',
    '30': 'q',
    '31': '.',
    '32': 'c',
    '33': 'o',
    '34': 'm',
    '35': '>',
    '36': ' ',
    '37': '@',
    '38': 'D',
    '39': 'a',
    '40': 't',
    '41': 'e',
    '42': ' ',
    '43': '2',
    '44': '0',
    '45': '2',
    '46': '0',
    '47': '-',
    '48': '0',
    '49': '2',
    '50': '-',
    '51': '2',
    '52': '8',
    '53': ' ',
    '54': '1',
    '55': '1',
    '56': ':',
    '57': '1',
    '58': '4',
    '59': ':',
    '60': '2',
    '61': '3',
    path: '/',
    component: require('../../layouts/index.js').default,
    routes: [
      {
        path: '/',
        exact: true,
        component: require('../index.js').default,
      },
      {
        '0': '登',
        '1': '陆',
        '2': '页',
        '3': ' ',
        '4': '@',
        '5': 'A',
        '6': 'u',
        '7': 't',
        '8': 'h',
        '9': 'o',
        '10': 'r',
        '11': ' ',
        '12': 'C',
        '13': 'r',
        '14': 'i',
        '15': 's',
        '16': 'h',
        '17': '<',
        '18': '7',
        '19': '1',
        '20': '4',
        '21': '4',
        '22': '1',
        '23': '5',
        '24': '4',
        '25': '7',
        '26': '3',
        '27': '@',
        '28': 'q',
        '29': 'q',
        '30': '.',
        '31': 'c',
        '32': 'o',
        '33': 'm',
        '34': '>',
        '35': ' ',
        '36': '@',
        '37': 'D',
        '38': 'a',
        '39': 't',
        '40': 'e',
        '41': ' ',
        '42': '2',
        '43': '0',
        '44': '2',
        '45': '0',
        '46': '-',
        '47': '0',
        '48': '2',
        '49': '-',
        '50': '2',
        '51': '8',
        '52': ' ',
        '53': '1',
        '54': '8',
        '55': ':',
        '56': '2',
        '57': '7',
        '58': ':',
        '59': '0',
        '60': '7',
        path: '/login',
        exact: true,
        component: require('../login.js').default,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/crish/.nvm/versions/node/v10.19.0/lib/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: false },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/crish/.nvm/versions/node/v10.19.0/lib/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: false },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
