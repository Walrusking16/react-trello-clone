import RouterService from '../Services/RouterService';
import Home from '../Pages/Home';
import Board from "../Pages/Board";

RouterService.addRoute({
  path: '/',
  component: Home,
});

RouterService.addRoute({
  path: '/b',
  component: Board,
});