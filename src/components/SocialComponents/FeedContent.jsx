import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DoneIcon from "@mui/icons-material/Done";
import SyncIcon from "@mui/icons-material/Sync";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FeedContent = ({ loggedInuserData }) => {
  const [postData, setpostData] = useState([]);
  const [activateFollowButton, setactivateFollowButton] = useState(false);
  const [Isfollowing, setIsfollowing] = useState(false);
  const {searchedUserData} = useSelector((store)=>store.user);
  // const [RequiredUserID, setRequiredUserID] = useState(loggedInUserData.id);

  console.log("feeduser", searchedUserData);
  const loadPost = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          `/api/posts?where[userId][equals]=${
            searchedUserData ? searchedUserData.id : loggedInuserData.id
          }`,
        { withCredentials: true }
      );
      console.log("response", response);
      setpostData(response.data.docs);
      if (searchedUserData.length !== 0) {
        setactivateFollowButton(true);
      }
      // setactivateFollowButton(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("postData", postData);

  const followUser = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + `/api/follows`,
        { to: `${searchedUserData.id}` },
        { withCredentials: true }
      );
      console.log(response);
      setIsfollowing(true);
    } catch (error) {
      console.log(error);
    }
    console.log("followed");
  };

  const unfollowUser = async () => {
    console.log("unfollowed");
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + `/api/follows/unfollow`,
        { to: `${searchedUserData.id}` },
        { withCredentials: true }
      );
      console.log(response);
      setIsfollowing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [likeChecked, setLikeChecked] = useState(() => {
    const initialMap = new Map();
    postData.forEach((data) => {
      initialMap.set(data.userId.id, false);
    });
    return initialMap;
  });

  const [unlikeChecked, setUnlikeChecked] = useState(() => {
    const initialMap = new Map();
    postData.forEach((data) => {
      initialMap.set(data.userId.id, false);
    });
    return initialMap;
  });

  const handleLikeChange = async (e) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + `/api/likes`,
        { postId: `${e.target.value}` },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setLikeChecked((prevState) => ({
      ...prevState,
      [e.target.value]: true,
    }));
    setUnlikeChecked((prevState) => ({
      ...prevState,
      [e.target.value]: false,
    }));
    console.log("like post id", e.target.value);
    console.log("liked");
  };
  const handleUnlikeChange = async (e) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + `/api/unlike`,
        { postId: `${e.target.value}` },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setLikeChecked((prevState) => ({
      ...prevState,
      [e.target.value]: false,
    }));
    setUnlikeChecked((prevState) => ({
      ...prevState,
      [e.target.value]: true,
    }));
    console.log("unliked");
  };

  return (
    <Box flex={3}  display = "flex" alignItems="center" justifyContent = "center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt="50px"
        // mr="20px"
        maxWidth="900px"
        // border="2px solid black"
      >
        <Box>
          <Button onClick={loadPost} cursor="pointer">
            <SyncIcon fontSize="large" />
          </Button>
          {activateFollowButton &&
            (Isfollowing ? (
              <Button
                variant="contained"
                sx={{ marginLeft: "200px" }}
                onClick={unfollowUser}
              >
                <div style={{ display: "flex" }}>
                  <DoneIcon />
                  Following
                </div>
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ marginLeft: "200px" }}
                onClick={followUser}
              >
                Follow {searchedUserData.username}
              </Button>
            ))}

          {/* <Button
              variant="contained"
              sx={{ marginLeft: "200px" }}
              onClick={followUser}
            >
              {Isfollowing
                ? <div style = {{display: "flex"}}><DoneIcon/>Following </div>
                : `Follow ${searchedUserData.username}`}
            </Button> */}
        </Box>
        {postData.map((data, index) => {
          return (
            <Card
              key={index}
              sx={{ width: "100%", height: "auto", marginBottom: "20px" }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {data.userId.username[0]}
                  </Avatar>
                }
                title={data.userId.username}
                subheader={data.userId.updatedAt.substring(0, 10)}
              />
              <CardMedia
                component="img"
                height="20%"
                width="70%"
                image={data.url}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {data.caption}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Checkbox
                  icon={<ThumbUpOutlinedIcon />}
                  checkedIcon={<ThumbUpIcon sx={{ color: "red" }} />}
                  checked={likeChecked[data.userId.id]}
                  onClick={handleLikeChange}
                  value={data.userId.id}
                />
                <Checkbox
                  icon={<ThumbDownAltOutlinedIcon />}
                  checkedIcon={<ThumbDownAltIcon sx={{ color: "red" }} />}
                  checked={unlikeChecked[data.userId.id]}
                  onClick={handleUnlikeChange}
                  value={data.userId.id}
                />
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default FeedContent;
