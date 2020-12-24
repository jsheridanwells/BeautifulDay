import ModuleListItemModel  from '../models/moduleListItem.model';

const moduleList = [
  new ModuleListItemModel({ name: 'Habits', endpoint: '/habits', link: '/habits', active: false, order: 0 }),
  new ModuleListItemModel({ name: 'Activity', endpoint: '/activity', link: '/activity', active: true, order: 1 }),
  new ModuleListItemModel({ name: 'Eating', endpoint: '/eating', link: '/eating', active: true, order: 2, }),
  new ModuleListItemModel({ name: 'Weight', endpoint: '/weight', link: '/weight', active: true, order: 3 })
];

export async function seedModuleList() {
  const count = await ModuleListItemModel.countDocuments();
  if (count !== moduleList.length) {
    await ModuleListItemModel.deleteMany({});
    ModuleListItemModel.create(moduleList, (list) => {
      if (list) {
	list.save();
      }
    });
  }
}

export async function getModuleList() {
  return await ModuleListItemModel.find({ active: true }, '-_id -__v');
}
