import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import AppConfig from '../../config/AppConfig';
import { useNavigate } from 'react-router-dom';

const EditNewsLogic = ({ newsData, setPageStatus }) => {
  const { API_ORIGIN } = AppConfig();
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      title: newsData && newsData.title,
      description: newsData && newsData.description,
    },
  });

  const [buttonLoading, setButtonLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const [links, setLinks] = useState(
    (newsData && newsData.links) || [{ title: '', adress: '' }]
  );

  const addLink = () => {
    let newLinks = links;
    newLinks.push({ title: '', adress: '' });
    setLinks([...newLinks]);
  };

  const updateLink = (index, attribute) => (event) => {
    let newLinks = links;
    newLinks[index][attribute] = event.target.value;
    setLinks([...newLinks]);
  };

  const onSubmit = (formData) => {
    const newNewsData = {
      title: formData.title,
      description: formData.description,
      links: links,
    };
    const finishUpdate = ({ data }) => {
      navigate('/actualite/' + data.id, { replace: true });
      window.location.reload(true);
    };
    setButtonLoading(true);

    if (newsData)
      axios
        .put(
          API_ORIGIN + '/news',
          { ...newNewsData, id: newsData.id },
          {
            headers: {
              'x-access-token': localStorage.getItem('accessToken'),
            },
          }
        )
        .then(finishUpdate)
        .catch((err) => {});
    else
      axios
        .post(API_ORIGIN + '/news', newNewsData, {
          headers: {
            'x-access-token': localStorage.getItem('accessToken'),
          },
        })
        .then(finishUpdate)
        .catch((err) => {
          console.log(err);
        });
  };

  const deleteNews = () => {
    handleCloseDeleteDialog();
    axios
      .delete(API_ORIGIN + '/news', {
        data: { id: newsData.id },
        headers: {
          'x-access-token': localStorage.getItem('accessToken'),
        },
      })
      .then(() => {
        navigate('/actualite');
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Keep counts of where to add carriage return
  const newlineList = useRef([]);

  // When return is pressed in the multiline text field
  const onReturnPress = (event) => {
    if (event.key === 'Enter') {
    }
  };

  const addNewlineToText = (text, newlineList) => {
    newlineList.forEach((newlineIndex) => {
      text = text.slice(0, newlineIndex) + '\n' + text.slice(newlineIndex);
    });
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    links,
    errors,
    addLink,
    updateLink,
    buttonLoading,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    deleteDialogOpen,
    deleteNews,
    onReturnPress,
  };
};

export default EditNewsLogic;
