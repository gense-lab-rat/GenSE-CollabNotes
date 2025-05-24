import React from 'react';
import CommentsSection from '../components/Comments/CommentsSection';

const NoteDetail: React.FC = () => {
  const noteId = Number(/* ambil dari route params */);

  return (
    <div>
      {/* ... tampilan judul & isi note ... */}
      <CommentsSection noteId={noteId} />
    </div>
  );
};

export default NoteDetail;
