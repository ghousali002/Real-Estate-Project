import styled from "styled-components";
import { useUser } from '../services/useUser';
import { Spinner } from "react-bootstrap";
import React from "react";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 2.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar() {
  const { data, isLoading, isError } = useUser();

  if (isLoading) {
    // Handle loading state
    return <Spinner />;
  }

  if (isError) {
    // Handle error state
    return <div>Error fetching user details</div>;
  }

  let Name = data.user?.Name || 'Unknown User';

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <StyledUserAvatar>
      <Avatar src={publicUrl + "assets/img/default-user.jpg"} alt={`Avatar of ${Name}`} />
      <h6>{Name}</h6>
    </StyledUserAvatar>
  );
}
