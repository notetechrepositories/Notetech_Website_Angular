import { Routes } from '@angular/router';



export const AdminExtraRoutes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: '',
                children: [
                    {

                    },

                ],
            },
        ],
    },
];
