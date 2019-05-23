import Dashboard from 'views/Dashboard/Dashboard.jsx';
import GridSystem from 'views/Components/GridSystem.jsx';
import RegularForms from 'views/Forms/RegularForms.jsx';
import ExtendedForms from 'views/Forms/ExtendedForms.jsx';
import RegularTables from 'views/Tables/RegularTables.jsx';
import ExtendedTables from 'views/Tables/ExtendedTables.jsx';
import DataTables from 'views/Tables/DataTables.jsx';
import GoogleMaps from 'views/Maps/GoogleMaps.jsx';
import FullScreenMap from 'views/Maps/FullScreenMap.jsx';
import VectorMap from 'views/Maps/VectorMap.jsx';
import Charts from 'views/Charts/Charts.jsx';
import Calendar from 'views/Calendar/Calendar.jsx';
import UserPage from 'views/Pages/UserPage.jsx';

import ListProducts from '../containers/Products/ListProductsContainer'
import FormAddProduct from '../containers/Products/AddProductContainer'
import ListPost from '../containers/Post/ListPostContainer'
import FormAddPost from '../containers/Post/AddPostContainer'

import pagesRoutes from './pages.jsx';

var pages = [{ path: "/pages/user-page", name: "User Page", mini: "UP", component: UserPage }].concat(pagesRoutes);

var dashRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { collapse: true, path: "/products", name: "Sản phẩm", state: "openComponents", icon: "pe-7s-plugin", views:[
        { path: "/products/list", name: "Danh sách sản phẩm", mini: "SP", view: true, component: ListProducts },
        { path: "/products/add", name: "Thêm sản phẩm", mini: "TS",view: true, component:  FormAddProduct },
        { path: "/products/edit/:id", name: "Thêm sản phẩm", view: false, component: FormAddProduct }
    ]
    },
    { collapse: true, path: "/category", name: "Danh mục", state: "openForms", icon: "pe-7s-note2", views:
        [{ path: "/category/list", name: "Danh sách danh mục", mini: "DM",view: true, component: RegularForms },
        { path: "/category/add", name: "Thêm danh mục", mini: "TD",view: true, component: ExtendedForms },
       ]
    },
    { collapse: true, path: "/post", name: "Bài viết", state: "openTables", icon: "pe-7s-news-paper", views:
        [{ path: "/post/list", name: "Danh sách bài viết", mini: "BV",view: true, component: ListPost },
        { path: "/post/add", name: "Thêm bài viết", mini: "TB",view: true, component: FormAddPost }]
    },
    { collapse: true, path: "/pages", name: "Pages", state: "openPages", icon:"pe-7s-gift", views:
        pages
    },
    {
        redirect : true, path: "/", pathTo: "/dashboard" 
    }
];
export default dashRoutes;
