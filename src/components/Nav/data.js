const MenuData = [
    {
        name: 'Learn',
        type: 'dropdown',
        items: [
            {
                name: 'What is Celestia?',
                url: '/what-is-celestia/'
            },
            {
                name: 'Intro to data availability',
                url: '/what-is-da/'
            },
            {
                name: 'Dive into modular',
                url: '/learn/'
            },
            {
                name: 'Read the whitepaper',
                url: 'https://arxiv.org/abs/1905.09274'
            }
        ]
    }, {
        name: 'Build',
        type: 'dropdown',
        items: [
            {
                name: 'Start with the dev portal',
                url: '/build/'
            },
            {
                name: 'Read the docs',
                url: 'https://docs.celestia.org/'
            },
            {
                name: 'View the GitHub repos',
                url: 'https://github.com/celestiaorg'
            }
        ]
    },
    {
        name: 'Run a node',
        type: 'link',
        url: '/run-a-light-node/'
    }
]

export default MenuData;