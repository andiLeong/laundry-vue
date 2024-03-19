import { shallowRef } from 'vue';
import ProfileUser from '@/svg/ProfileUser.vue';
import Document from '@/svg/Document.vue';
import Cog6Tooth from '@/svg/Cog6Tooth.vue';
import { useRoute } from 'vue-router';

export default function useDashboardNavigationLink() {
    const links = shallowRef([
        {
            name: 'Profile',
            route: 'profile',
            svg: ProfileUser,
            active: false,
        },
        {
            name: 'Order',
            route: 'order',
            svg: Document,
            active: false,
        },
        {
            name: 'Setting',
            route: 'home',
            svg: Cog6Tooth,
            active: false,
        },
        {
            name: 'Address',
            route: 'address',
            svg: Cog6Tooth,
            active: false,
        },
    ]);

    function setActiveLink() {
        let routeName = useRoute().name;
        links.value = links.value.map(link => {
            if (routeName === link.route) {
                link.active = true;
            }

            if (link.route === 'order' && routeName === 'order-detail') {
                link.active = true;
            }

            if (link.route === 'address' && routeName === 'address-create') {
                link.active = true;
            }

            return link;
        });
    }

    setActiveLink();

    return {
        links,
    };
}
