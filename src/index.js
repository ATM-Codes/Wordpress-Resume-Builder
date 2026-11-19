import ResumeList from './components/ResumeList.js'
import ResumeEditor from './components/ResumeEditor.js'
import {createRoot, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';


function App(){

const [ resumes, setResumes ] = useState( [] );
const [ isLoading, setIsLoading ] = useState( true );
const [ error, setError ] = useState( null );
const [selectedId,setSelectedId] = useState(null);


useEffect( () => {
    apiFetch( { path: '/resbuild/v1/resumes' } )
        .then( ( data ) => setResumes( data ) )
        .catch( ( err ) => setError( err.message ) )
        .finally( () => setIsLoading( false ));
}, [] );

    if ( isLoading ) {
		return <p>{ __( 'Loading resumes…', 'resume-builder' ) }</p>;
	}

	if ( error ) {
		return <p role="alert">{ error }</p>;
	}

	if ( resumes.length === 0 ) {
		return <p>{ __( 'No resumes yet.', 'resume-builder' ) }</p>;
    }

    const selected = resumes.find( ( resume ) => resume.id === selectedId );

    function handleSaved( saved ) {
	setResumes( ( current ) =>
		current.map( ( resume ) => ( resume.id === saved.id ? saved : resume ) )
	);
}

    if ( selected ) {
	return (
        <>
		<ResumeEditor
			key={ selected.id }
			resume={ selected }
			onSaved={ handleSaved }
			onBack={ () => setSelectedId( null ) }
		/>
        </>
	);
    }

    return (<><ResumeList resumes={resumes} onSelect={setSelectedId} />    
    </>)
}

const container = document.getElementById('resume-builder-app');

if(container){
    createRoot(container).render(<App/>);
}

