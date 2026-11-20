import { __, sprintf } from '@wordpress/i18n';

/**
 * Lists the current user's resumes with edit and delete actions.
 */
export default function ResumeList( { resumes, onSelect, onDelete, onExport } ) {
	return (
		<ul className="resbuild-list">
			{ resumes.map( ( resume ) => {
				const modified = resume.modified
					? new Date( resume.modified ).toLocaleString()
					: '';

				return (
					<li className="resbuild-list__item" key={ resume.id }>
						<div>
							<h3 className="resbuild-list__title">{ resume.title }</h3>
							{ modified && (
								<p className="resbuild-list__meta">
									{ sprintf( __( 'Modified: %s', 'resume-builder' ), modified ) }
								</p>
							) }
						</div>

						<div className="resbuild-list__actions">
							<button
								type="button"
								className="resbuild-link"
								onClick={ () => onSelect( resume.id ) }
								aria-label={ sprintf( __( 'Edit %s', 'resume-builder' ), resume.title ) }
							>
								{ __( 'Edit', 'resume-builder' ) }
							</button>
							<button
								type="button"
								className="resbuild-link resbuild-link--danger"
								onClick={ () => onDelete( resume.id ) }
								aria-label={ sprintf( __( 'Delete %s', 'resume-builder' ), resume.title ) }
							>
								{ __( 'Delete', 'resume-builder' ) }
							</button>
							<button
								type="button"
								className="resbuild-link resbuild-link--pdf"
								onClick={ () => onExport( resume.id ) }
								aria-label={ sprintf( __( 'Export as PDF', 'resume-builder' ), resume.title ) }
							>
								{ __( 'Export', 'resume-builder' ) }
							</button>
						</div>
					</li>
				);
			} ) }
		</ul>
	);
}