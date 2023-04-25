import { useContext, useEffect, useState } from 'react';


import { AuthContext } from '../../context/AuthContext';
import { SmallField } from '../../lib/style/generalStyles';
import Button from '../Button/Button';
import ModalCard from '../ModalCard/ModalCard';
import {
  CloseIcon,
  IngredientCard as Card,
  EditIcon,
  TickIcon,
  TrashIcon,
  IconsWrapper,
} from './IngredientCardStyle';

const IngredientCard = ({ ingredientID, formik, index, ingredient, }) => {
  const { setToastType } = useContext(AuthContext);

  const [isedit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteIngredient = (ingredientID) => {

  };

  const handleSaveIngredient = (ingredientID, index) => {

  };

  console.log("test")
  useEffect(() => {
    console.log("formik: ", formik)
    if (formik.values.ingredients[index] === "") setEdit(true)
  }, [formik.values, index])

  return (
    <Card isedit={isedit ? 1 : 0}>
      <SmallField
        autoFocus
        type={`ingredient[${index}]`}
        name={`ingredient[${index}]`}
        placeholder="Enter ingredient name"
        disabled={formik.isSubmitting || !isedit}
        ingredient={'isAddIngredient'}
        isedit={isedit ? 1 : 0}
        error={
          formik.touched.ingredient &&
          formik.errors.ingredient &&
          formik.touched.ingredient[index] &&
          formik.errors.ingredient[index] &&
          formik.touched.ingredient[index] &&
          formik.errors.ingredient[index]
        }
      />
      {isedit === true ? (
        <IconsWrapper>
          <CloseIcon
            onClick={function () {
              (formik.initialValues.ingredient[index] === "") &&
                handleDeleteIngredient(ingredientID)

              setEdit(false)
              formik.resetForm()
            }}
          />
          <TickIcon
            type="submit"
            onClick={() =>
              formik.values.ingredients[index] !==
              formik.initialValues.ingredient[index] &&
              handleSaveIngredient(ingredientID, index)}
          />
        </IconsWrapper>
      ) : (
        <IconsWrapper>
          <TrashIcon onClick={() =>
            formik.values.ingredients[index] !== "" ?
              setOpenModal(true)
              :
              handleDeleteIngredient(ingredientID)
          } />
          <EditIcon onClick={() => setEdit(true)} />
        </IconsWrapper>
      )}

      <ModalCard
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={`Delete ingredient?`}
        elements={
          <>
            <Button
              type="button"
              callback={function () {
                handleDeleteIngredient(ingredientID);
                setOpenModal(false);
              }}
            >
              Delete
            </Button>
            <Button type="button" isCancel callback={() => setOpenModal(false)}>
              Cancel
            </Button>
          </>
        }
      >
        Are you sure you want to delete lecture?
      </ModalCard>
    </Card>
  );
};

export default IngredientCard;
