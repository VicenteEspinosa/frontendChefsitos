import RecipeForm from '../../components/forms/RecipeForm'

export default function NewRecipePage(props: { isMobile: boolean }) {
  return <RecipeForm isMobile={props.isMobile} />
}
