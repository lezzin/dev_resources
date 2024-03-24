import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Profile from "./components/Profile.js";
import Topic from "./components/Topic.js";
import FormTopic from "./components/FormTopic.js";
import formEditTopic from "./components/FormEditTopic.js";
import FormContent from "./components/FormContent.js";
import formEditContent from "./components/FormEditContent.js";
import NotFound from "./components/NotFound.js";

const routes = [{
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/topic-form',
        component: FormTopic
    },
    {
        path: '/topic/:id',
        component: Topic,
    },
    {
        path: '/topic/:id/content-form',
        component: FormContent
    },
    {
        path: '/topic/:id/edit',
        component: formEditTopic
    },
    {
        path: '/topic/:id/content/:contentId/edit',
        component: formEditContent
    },
    {
        path: '*',
        component: NotFound
    }
];

export default routes;