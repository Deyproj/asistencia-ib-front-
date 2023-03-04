import React from 'react';

const Data = () => {
    return (
        <>
            <div className='principal text-center d-none d-lg-block'>
                <br />
                <iframe title="Report Section" width="1300" height="900" src="https://app.powerbi.com/view?r=eyJrIjoiZTk5NWNlNzAtNTAyMS00NmZjLWFhN2MtZmJiNzU4YTU0MzY4IiwidCI6IjUxMGY5ZGUwLTk2MTUtNGE5Ny04ZmZhLTAzNTRkZDZjZDZjNyIsImMiOjR9"  allowFullScreen="True"></iframe>
                </div>
                <div className='principal text-center d-block d-lg-none'>
                <br />
                <h1 className='text-primary'>Visualizalo en tu computador</h1>
            </div>
        </>
    );
}

export default Data;