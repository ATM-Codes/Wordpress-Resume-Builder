import { __ } from "@wordpress/i18n";


function formatRange( start, end, current ) {
        const to = current ? __( 'Present', 'resume-builder' ) : formatMonth( end );
        return [ formatMonth( start ), to ].filter( Boolean ).join( ' – ' );
    }


     function formatMonth( value ) 
        {
        if ( ! value ) {
            return '';
        }
        const [ year, month ] = value.split( '-' );
        return new Date( Number( year ), Number( month ) - 1 ).toLocaleDateString( undefined, {
            month: 'short',
            year: 'numeric',
        } );
    }       

    function ExperienceItem( { item } ) {
	const bullets = ( item.bullets ?? [] ).filter( ( line ) => line.trim() );
	return (
        
		<div className="resbuild-preview__item">

			<div className="resbuild-preview__row">
				<strong>{ [ item.jobTitle, item.company ].filter( Boolean ).join( ', ' ) }</strong>
				<span>{ formatRange( item.startDate, item.endDate, item.current ) }</span>
			</div>
			{ item.location && <div className="resbuild-preview__muted">{ item.location }</div> }
			{ bullets.length > 0 && (
				<ul>
					{ bullets.map( ( line, i ) => <li key={ i }>{ line }</li> ) }
				</ul>
			) }
		</div>
	);
    }

    function EducationItem( { item } ) {
	return (
        
		<div className="resbuild-preview__item">

			<div className="resbuild-preview__row">
				<strong>{ [ item.qualification, item.institution].filter( Boolean ).join( ', ' ) }</strong>

                <span>{ formatRange( item.startDate, item.endDate) }</span>
			</div>
            				
			{ [item.location, item.grade].filter( Boolean ).join( ', ' ) }
		</div>
	);
    }

    function AwardsItem( { item } ) {
	const bullets = ( item.bullets ?? [] ).filter( ( line ) => line.trim() );
	return (
        
		<div className="resbuild-preview__item">

			<div className="resbuild-preview__row">
				<strong>{ [ item.awardName, item.organization ].filter( Boolean ).join( ', ' ) }</strong>
				<span>{ formatRange( item.dateReceived, ) }</span>
			</div>
			{ bullets.length > 0 && (
				<ul>
					{ bullets.map( ( line, i ) => <li key={ i }>{ line }</li> ) }
				</ul>
			) }
		</div>
	);
    }

      
    const ITEM_COMPONENTS = {
	    education: EducationItem,
	    experience: ExperienceItem,
	    awards: AwardsItem,
    };

    const SECTION_LABELS={
        education:__('Education','resume-builder'),
        experience:__('Experience','resume-builder'),
        awards:__('Awards','resume-builder'),
    };

export default function ResumePreview( { resume, onBack } ) {
	// 1. Read personal and sections from resume.content, with ?? fallbacks.

    const personal = resume.content?.personal ?? {};
    const sections = resume.content?.sections ?? [];


    const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ');
    const contact = [personal.email, personal.phone,personal.linkedin, personal.github].filter(Boolean).join(' · ');
    
	// 3. Return:
    return(<>
        <div className="resbuild-no-print">
            <button type="button" onClick={onBack}>
				{__('Back','resume-builder')}
			</button>
            <button type="button" onClick={()=>window.print()}>
				{__('Download PDF','resume-builder')}
			</button>
        </div>
        <article className="resbuild-preview">
            <h2>{fullName}</h2>
            {contact && <p className="resbuild-preview__muted">{contact}</p>}

            {
                sections.map((section)=>{
                    const Item = ITEM_COMPONENTS[section.type];
                    if(!Item || section.items.length===0){
                        return null;
                    }
                    return(
                        <section key={section.id}>
                            <h3>{SECTION_LABELS[section.type]}</h3>
                            {section.items.map((item)=> <Item key={item.id} item={item} />)}
                        </section>
                    )
                })
            }
        </article>
        </>)
}