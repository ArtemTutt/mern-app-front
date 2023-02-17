import React, { useEffect, useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPopPosts, fetchPosts, fetchTags } from "../Redux/slices/posts";
import { logout } from "../Redux/slices/auth";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags, popPosts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  const [choose, setChoose] = useState(true);

  console.log(choose);

  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchPopPosts());
  }, []);

  console.log(posts);

  const onHandleSwitching = () => {
    setChoose((prevState) => !prevState);
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={choose ? 0 : 1}
        aria-label="basic tabs example"
        onChange={onHandleSwitching}
      >
        <Tab value={0} label="Новые" />
        <Tab value={1} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        {choose ? (
          <Grid xs={8} item>
            {(isPostLoading ? [...Array(5)] : posts.items).map((item, index) =>
              isPostLoading ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  _id={item._id}
                  title={item.title}
                  imageUrl={
                    item.imageUrl ? `http://localhost:8000${item.imageUrl}` : ""
                  }
                  user={item.user}
                  createdAt={item.createdAt}
                  viewsCount={item.viewsCount}
                  commentsCount={3}
                  tags={["react", "fun", "typescript"]}
                  isEditable={userData?._id === item.user._id}
                />
              )
            )}
          </Grid>
        ) : (
          <Grid xs={8} item>
            {(isPostLoading ? [...Array(5)] : popPosts.items).map(
              (item, index) =>
                isPostLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    _id={item._id}
                    title={item.title}
                    imageUrl={
                      item.imageUrl
                        ? `http://localhost:8000${item.imageUrl}`
                        : ""
                    }
                    user={item.user}
                    createdAt={item.createdAt}
                    viewsCount={item.viewsCount}
                    commentsCount={3}
                    tags={["react", "fun", "typescript"]}
                    isEditable={userData?._id === item.user._id}
                  />
                )
            )}
          </Grid>
        )}

        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {/*<CommentsBlock*/}
          {/*  items={[*/}
          {/*    {*/}
          {/*      user: {*/}
          {/*        fullName: "Вася Пупкин",*/}
          {/*        avatarUrl: "https://mui.com/static/images/avatar/1.jpg",*/}
          {/*      },*/}
          {/*      text: "Это тестовый комментарий",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      user: {*/}
          {/*        fullName: "Иван Иванов",*/}
          {/*        avatarUrl: "https://mui.com/static/images/avatar/2.jpg",*/}
          {/*      },*/}
          {/*      text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  isLoading={false}*/}
          {/*/>*/}
        </Grid>
      </Grid>
    </>
  );
};
