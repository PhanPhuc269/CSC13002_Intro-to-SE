import config from '~/config';

//Auth
import { StudentRoute } from '~/auth';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import MyCourse from '~/pages/MyCourses';
import Watch from '~/pages/Watch';
import Search from '~/pages/Search';
import Login from '~/pages/Login';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.watch, component: Watch, auth: StudentRoute },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.myCourse, component: MyCourse, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
