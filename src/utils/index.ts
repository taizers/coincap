export const roundValue = (price: number) => {
    if (+price.toFixed(2) !== 0) {
      return price.toFixed(2);
    }
    return price.toString();
};

export const handleAddButtonClick = (event: React.MouseEvent<unknown>, id: string) => {
    event.stopPropagation();
    console.log(id);
};