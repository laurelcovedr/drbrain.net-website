import type {ComponentProps} from 'react';

// Page navigation uses ordinary document requests, including before hydration.
export default function SiteLink(props:ComponentProps<'a'>){return <a {...props}/>}
