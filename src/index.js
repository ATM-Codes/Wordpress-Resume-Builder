import {createRoot} from '@wordpress/element'

function App(){
    return <h1>Resume Builder</h1>;
}

const container = document.getElementById('resume-builder-app');

if(container){
    createRoot(container).render(<App/>);
}