export function chainMethodDecorators(
  ...decorators: MethodDecorator[]
): MethodDecorator {
  return (target, propertyKey, descriptor) =>
    decorators.reduce(
      (currDescriptor, decorator) =>
        decorator(target, propertyKey, currDescriptor) ?? currDescriptor,
      descriptor
    );
}
