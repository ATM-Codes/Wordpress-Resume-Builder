import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';


//Component that displays all the resumes

export default function ResumeList() {
	const [ resumes, setResumes ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ error, setError ] = useState( null );

	useEffect( () => {
		apiFetch( { path: '/resbuild/v1/resumes' } )
			.then( ( data ) => setResumes( data ) )
			.catch( ( err ) => setError( err.message ) )
			.finally( () => setIsLoading( false ) );
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

	return (
		<ul>
			{ resumes.map( (resume) => (
				<li key={ resume.id }>{ resume.title }</li>
			) ) }
		</ul>
	);
}