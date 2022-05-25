import NewRecipeForm from '../../components/forms/NewRecipeForm'

export default function NewRecipePage(props: { isMobile: boolean }) {
  return <NewRecipeForm isMobile={props.isMobile} />
}
