import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Icon, Label } from 'semantic-ui-react';
import Tooltip from '../util/Tooltip';

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {

    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to={"/login"} color="teal" basic>
      <Icon name="heart" />
    </Button>
  );
  return user ? (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Tooltip content={liked ? 'Unlike' : 'Like'}>{likeButton}</Tooltip>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  ) : (
    <Button as="div" labelPosition="right">
    <Tooltip content={liked ? "Unlike" : "Like"}>{likeButton}</Tooltip>
    <Label basic color="blue" pointing="left">
        {likeCount}
    </Label>
</Button>
  )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
