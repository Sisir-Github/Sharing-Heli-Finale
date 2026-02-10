# Helicopter GLB Placement

Place your production helicopter model at:

`/public/models/helicopter.glb`

## Recommended node naming (for rotor animation detection)

Use any of these names on the relevant rotor nodes (case-insensitive):

- Main rotor: `MainRotor`, `main_rotor`, `Rotor_Main`, `m_rotor`
- Tail rotor: `TailRotor`, `tail_rotor`, `Rotor_Tail`, `t_rotor`

The scene also infers spin axis from mesh bounds, but naming these nodes improves reliability.

## Model quality requirements

- Realistic proportions (body, tail boom, landing skids, rotor hubs)
- PBR materials (metal, paint, glass)
- Optimized geometry + textures for web performance
- Optional Draco compression supported by modern GLTF pipelines
