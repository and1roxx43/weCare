import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from "./LikeButton";
import DeleteButton from './DeleteButton';
import Tooltip from '../util/Tooltip';

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) { 
  const { user } = useContext(AuthContext);

  return (
    <Card className="post-card" fluid>
      <Card.Content>
        <Card.Header>{capitalizeFirstLetter(username)}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Tooltip content="comment on this post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </Tooltip>
        {user && user.username === username && (<DeleteButton postId={id} />)}
      </Card.Content>
    </Card>
  );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default PostCard;
